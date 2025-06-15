const db = require('../../database/connections');

const { sendExpiryEmail } = require('./mailer');

async function notifyAndDeleteExpiredRoles() {
    try {
        await db.query('USE mydatabase');
        const [roles] = await db.query(`
      SELECT * FROM user_roles 
      WHERE expiry_date IS NOT NULL AND expiry_date < NOW()
    `);

        if (roles.length === 0) {
            console.log('No expired roles found.');
            return;
        }

        const userIds = roles.map(r => r.user_id);
        const placeholders = userIds.map(() => '?').join(', ');
        const [users] = await db.query(
            `SELECT * FROM users WHERE id IN (${placeholders})`,
            userIds
        );

        for (const role of roles) {
            const user = users.find(u => u.id === role.user_id);
            if (!user) continue;
            const formattedDate = new Date(role.expiry_date).toLocaleDateString('en-GB');
            await sendExpiryEmail(user.email, user.username, formattedDate);

            // Delete the expired role
            await db.query(`
        DELETE FROM user_roles 
        WHERE user_id = ? AND role_id = ?
      `, [role.user_id, role.role_id]);
        }

        console.log('✅ All expired users notified and roles removed.');
    } catch (err) {
        console.error('❌ Error while notifying expired users:', err);
    }
}

// Run the function immediately:
notifyAndDeleteExpiredRoles();
