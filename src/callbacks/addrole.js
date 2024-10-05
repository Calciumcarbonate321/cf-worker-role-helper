import dotenv from 'dotenv';
dotenv.config({ path: '.dev.vars' });

export async function addRole(guildId, userId, roleId) {
    if (!guildId || !userId || !roleId) {
        throw new Error('Guild ID, User ID, and Role ID are required');
    }

    const url = `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`;
    const token = process.env.DISCORD_TOKEN;
    
    if (!token) {
        throw new Error('Discord token is not configured');
    }

    try {
        // First, get the current roles
        const getResponse = await fetch(url, {
            headers: {
                Authorization: `Bot ${token}`,
            },
        });

        if (!getResponse.ok) {
            const errorText = await getResponse.text();
            console.error('Error fetching member:', errorText);
            throw new Error(`Failed to fetch member: ${getResponse.status} ${getResponse.statusText}`);
        }

        const memberData = await getResponse.json();
        
        // Add the new role to existing roles
        const currentRoles = memberData.roles || [];
        const updatedRoles = [...new Set([...currentRoles, roleId])];

        // Update the roles
        const patchResponse = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${token}`,
            },
            body: JSON.stringify({ roles: updatedRoles }),
        });

        if (!patchResponse.ok) {
            const errorText = await patchResponse.text();
            console.error('Error updating roles:', errorText);
            throw new Error(`Failed to update roles: ${patchResponse.status} ${patchResponse.statusText}`);
        }

        const updatedMember = await patchResponse.json();
        console.log('Role added successfully');
        return updatedMember;
    } catch (error) {
        console.error('Error in addRole:', error);
        throw error;
    }
}
