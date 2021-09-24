<template>
	<div :class="`c-discord-chat c-discord-chat--${theme}`">
		<flex
			class="c-discord-chat__header"
			main="between"
			cross="center"
		>
			<div class="c-discord-chat__title">
				{{ voiceChatTitle }}
			</div>
			<div v-if="!showHeadRow" class="c-discord-chat__count">
				<svg-icon
					v-if="showUsersIcon"
					name="fa-users"
					class="o-icon o-icon-lg"
				/>
				{{ members.length }}
			</div>
		</flex>
		<flex
			v-if="showHeadRow"
			class="c-discord-chat__additionnal-row"
			main="between"
			cross="center"
		>
			<div class="c-discord-chat__title">
				Chatting:
			</div>
			<div class="c-discord-chat__count">
				{{ members.length }}
			</div>
		</flex>
		<flex
			v-for="m in members"
			:key="m.userID"
			:class="{
				'c-discord-chat__member': true,
				'c-discord-chat__member--active': m.speaking
			}"
			cross="center"
			:style="`background-color: #${backgroundColor(m.color)}`"
		>
			<div class="c-discord-chat__speaker-placeholder">
				<svg-icon
					name="volume-2"
					class="o-icon o-icon-lg"
				/>
			</div>
			<div
				v-if="['h2a'].includes(theme)"
				class="c-discord-chat__member-before"
				:style="`border-bottom: .1rem solid #${m.color}; border-left: .1rem solid #${m.color}; box-shadow: 0 0 1rem 0 #${m.color} inset;`"
			/>
			<div
				:class="{
					'c-discord-chat__avatar-placeholder u-flex__item-none': true,
					'c-discord-chat__avatar-placeholder--active': m.speaking
				}"
			>
				<img :src="m.avatarURL">
			</div>
			<div
				class="c-discord-chat__member-name u-flex__item-fluid"
				:style="`background-color: #${backgroundColor(m.color)}; color: ${textColor(m.color)}`"
			>
				<span>{{ m.displayName }}</span>
			</div>
		</flex>
	</div>
</template>

<script src="./DiscordChat.index.js"></script>

<style lang="scss" src="./DiscordChat.scss"></style>
<style lang="scss" src="./themes/menu.scss"></style>
<style lang="scss" src="./themes/ce.scss"></style>
<style lang="scss" src="./themes/h2.scss"></style>
<style lang="scss" src="./themes/h2a.scss"></style>
<style lang="scss" src="./themes/h3.scss"></style>
<style lang="scss" src="./themes/odst.scss"></style>
<style lang="scss" src="./themes/reach.scss"></style>
<style lang="scss" src="./themes/h5.scss"></style>
<style lang="scss" src="./themes/infinite.scss"></style>
