<template>
	<div class="p-waiting-screen">
		<div v-for="i in 3" :key="`svg-${i}`" class="p-waiting-screen__neon">
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width="850.000000pt"
				height="462.000000pt"
				viewBox="0 0 850.000000 462.000000"
				preserveAspectRatio="xMidYMid meet"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				:style="i > 1 ? 'filter: url(#blur);' : ''"
			>
				<g
					transform="translate(0.000000,462.000000) scale(0.100000,-0.100000)"
					fill="none"
					stroke="#fff"
					stroke-width="20"
					fill-rule="evenodd"
				>
					<path
						class="p-waiting-screen__path"
						d="M650 2560 l0 -1440 535 0 534 0 3 418 c3 406 4 418 26 473 29 73 82
                        134 146 166 l51 27 405 7 c223 4 541 9 708 11 l302 3 0 -305 c0 -408 -19 -611
                        -66 -704 -17 -36 -22 -31 130 -133 430 -287 976 -443 1611 -460 769 -20 1583
                        163 2275 513 235 119 541 315 540 347 -1 7 -31 45 -68 85 l-67 73 -145 -69
                        c-394 -190 -806 -339 -1190 -431 -323 -78 -582 -111 -880 -111 -391 0 -684 59
                        -969 196 -428 205 -699 561 -741 977 -12 115 0 300 26 431 153 756 865 1062
                        2144 920 74 -8 147 -17 163 -20 l27 -6 0 130 0 129 -132 36 c-621 168 -1260
                        219 -1763 141 -248 -39 -430 -95 -640 -199 -136 -67 -331 -197 -374 -249 -11
                        -12 -8 -26 12 -78 48 -120 81 -349 93 -645 l7 -163 -961 0 -962 0 0 685 0 685
                        -390 0 -390 0 0 -1440z"
					/>
					<path
						:class="`p-waiting-screen__path ${i < 2 ? 'p-waiting-screen__path--blue' : ''}`"
						d="M5043 2885 c-185 -50 -348 -206 -405 -388 -30 -95 -32 -274 -4 -357
                        48 -141 151 -273 266 -337 102 -58 173 -76 295 -77 179 -1 298 47 421 169 143
                        143 204 346 163 547 -42 205 -219 389 -425 443 -73 19 -240 19 -311 0z"
					/>
				</g>
			</svg>
		</div>
		<div>
			<ul class="p-waiting-screen__eyes">
				<li />
				<li />
			</ul>
		</div>
		<div class="p-waiting-screen__text">
			{{ currentMsg }}
		</div>
		<div class="p-waiting-screen__odst-overlay">
			<img
				v-for="layer in odstLayers"
				:key="layer"
				:src="`/odst-overlay/${layer}`"
			>
		</div>
		<div class="p-waiting-screen__emotes">
			<img :src="`/emotes/${emote1}`" class="p-waiting-screen__emote-1">
			<img :src="`/emotes/${emote2}`" class="p-waiting-screen__emote-2">
		</div>
		<div class="p-waiting-screen__links">
			<ul :class="`position-${linkPosition}`">
				<flex
					v-for="(link, index) in links"
					:key="`${link.key}-${index}`"
					tag="li"
					:class="linkPosition === index ? 'active' : ''"
					cross="center"
				>
					<svg-icon
						class="o-icon u-mr-sm"
						:name="link.key"
					/>
					{{ link.value }}
				</flex>
			</ul>
		</div>
		<svg height="110" width="110">
			<defs>
				<filter id="blur" x="0" y="0">
					<feGaussianBlur in="SourceGraphic" stdDeviation="15" />
				</filter>
			</defs>
		</svg>
	</div>
</template>

<script src="./_type.js"></script>

<style src="./_type.scss" lang="scss"></style>
