<template>
	<div class="u-w-100">
		<flex
			v-for="(item, index) in editLines"
			:key="`row-${index}`"
			main="stretch"
			cross="center"
			class="u-w-100 u-mt-md"
		>
			<span class="u-mr-md">
				{{ index + 1 }}/4
			</span>
			<div class="c-social-networks__select--wrapper u-mr-md">
				<select
					v-model="item.key"
					class="c-social-networks__select"
					:name="`row-${item.index}-type-select`"
				>
					<option
						v-for="type in types"
						:key="type.key"
						:value="type.key"
						:selected="item.key === type.key"
					>
						{{ type.name }}
					</option>
				</select>
				<svg-icon
					name="chevron-down"
					class="o-icon o-icon-md c-social-networks__select--chevron"
				/>
			</div>
			<text-field
				v-model="item.value"
				class="c-social-networks__textfield u-flex__item-fluid u-mr-md"
			>
				Value
			</text-field>
			<button
				type="button"
				class="o-btn o-btn--warning u-mr-md"
				:disabled="socialNetworks[index].key === item.key && socialNetworks[index].value === item.value"
				@click="() => updateSocialNetwork(index)"
			>
				Update
			</button>
			<button
				type="button"
				class="o-btn o-btn--danger"
				@click="() => removeSocialNetwork(index)"
			>
				Remove
			</button>
		</flex>
		<flex
			v-if="editLines.length < 4"
			main="stretch"
			cross="center"
			class="u-w-100 u-mt-md"
		>
			<span class="u-mr-md">
				{{ editLines.length + 1 }}/4
			</span>
			<div class="c-social-networks__select--wrapper u-mr-md">
				<select
					v-model="newLine.key"
					class="c-social-networks__select"
					:name="`row-${editLines.length + 1}-type-select`"
				>
					<option
						selected
						disabled
						hidden
						value=""
					>
						Choose
					</option>
					<option
						v-for="type in types"
						:key="type.key"
						:value="type.key"
						:selected="newLine.key === type.key"
					>
						{{ type.name }}
					</option>
				</select>
				<svg-icon
					name="chevron-down"
					class="o-icon o-icon-md c-social-networks__select--chevron"
				/>
			</div>
			<text-field
				v-model="newLine.value"
				class="c-social-networks__textfield u-flex__item-fluid u-mr-md"
			>
				Value
			</text-field>
			<button
				type="button"
				class="o-btn o-btn--primary"
				:disabled="!newLine.key || !newLine.value"
				@click="addSocialNetwork"
			>
				Add
			</button>
		</flex>
	</div>
</template>

<script src="./SocialNetworks.index.js"></script>

<style lang="scss" src="./SocialNetworks.scss"></style>
