import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from 'twitch';
import { rtfm } from 'twitch-common';

/** @private */
export interface EventSubChannelModeratorEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
}

/**
 * An EventSub event representing a broadcaster adding or removing a moderator in their channel.
 */
@rtfm<EventSubChannelModeratorEvent>('twitch-eventsub', 'EventSubChannelModeratorEvent', 'userId')
export class EventSubChannelModeratorEvent {
	/** @private */
	@Enumerable(false) protected readonly _client: ApiClient;

	/** @private */
	constructor(private readonly _data: EventSubChannelModeratorEventData, client: ApiClient) {
		this._client = client;
	}

	/**
	 * The ID of the broadcaster that added or removed a moderator.
	 */
	get broadcasterId(): string {
		return this._data.broadcaster_user_id;
	}

	/**
	 * The name of the broadcaster that added or removed a moderator.
	 */
	get broadcasterName(): string {
		return this._data.broadcaster_user_login;
	}

	/**
	 * The display name of the broadcaster that added or removed a moderator.
	 */
	get broadcasterDisplayName(): string {
		return this._data.broadcaster_user_name;
	}

	/**
	 * Retrieves more information about the broadcaster.
	 */
	async getBroadcaster(): Promise<HelixUser> {
		return (await this._client.helix.users.getUserById(this._data.broadcaster_user_id))!;
	}

	/**
	 * The ID of the user that was added or removed as a moderator.
	 */
	get userId(): string {
		return this._data.user_id;
	}

	/**
	 * The name of the user that was added or removed as a moderator.
	 */
	get userName(): string {
		return this._data.user_login;
	}

	/**
	 * The display name of the user that was added or removed as a moderator.
	 */
	get userDisplayName(): string {
		return this._data.user_name;
	}

	/**
	 * Retrieves more information about the user.
	 */
	async getUser(): Promise<HelixUser> {
		return (await this._client.helix.users.getUserById(this._data.user_id))!;
	}
}
