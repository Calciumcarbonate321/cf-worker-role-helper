export const CATPIC_COMMAND = {
    name: 'catpic',
    description: 'Send cute cat pics to bless the chat',
  };
  
export const INVITE_COMMAND = {
    name: 'invite',
    description: 'Get an invite link to add the bot to your server',
  };
  
export const ADDROLE_COMMAND = {
    name: 'addrole',
    description: 'Adds test role to you',
    options: [
        {
            name: 'role',
            description: 'The role you want to add',
            type: 8,
            required: true,
        }
    ]
  };
