// just a utility to prepare the details we need for each member of a voice chan
export const setGuildMemberDetails = (member) => {
	try {
		const roleColor = !member.roles.color ? 'ffffff' : member.roles.color.color.toString(16)
		return {
			avatarURL  : member.user.avatarURL({ format: 'jpg', dynamic: true, size: 64 }),
			color      : roleColor,
			displayName: member.displayName,
			speaking   : false,
			userID     : member.id
		}
	} catch (err) {
		console.warn(`in utils/_setGuildMemberDetails.js#setGuildMemberDetails: ${err.message}`)
		return {
			avatarURL  : '',
			color      : '000000',
			displayName: member.displayName,
			speaking   : false,
			userID     : member.id
		}
	}
}
