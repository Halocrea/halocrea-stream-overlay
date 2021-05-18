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
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			latestFollower  : 'twitch/latestFollower',
			latestSubscriber: 'twitch/latestSubscriber'
		})
	}
}
</script>
