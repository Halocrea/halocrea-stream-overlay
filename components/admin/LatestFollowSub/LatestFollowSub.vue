<template>
	<flex
		class="u-m-md u-p-lg"
		direction="column"
		cross="stretch"
	>
		<flex
			v-if="latestFollower && latestFollower.display_name"
			main="between"
		>
			<div class="u-p-sm">
				Latest Follower:
			</div>
			<div class="u-p-sm">
				{{ latestFollower.display_name }}
			</div>
		</flex>
		<flex
			v-if="latestSubscriber && latestSubscriber.display_name"
			main="between"
		>
			<div class="u-p-sm">
				Latest Subscriber:
			</div>
			<div class="u-p-sm">
				{{ latestSubscriber.display_name }}
			</div>
		</flex>
	</flex>
</template>

<script>
export default {
	data () {
		return {
			loading         : false,
			latestFollower  : null,
			latestSubscriber: null
		}
	},

	async created () {
		this.loading          = true
		const { data }        = await this.$axios.get('/api/private-twitch/latest-follow-sub')
		this.latestFollower   = data.follower
		this.latestSubscriber = data.subscriber
		this.loading          = false
	}
}
</script>
