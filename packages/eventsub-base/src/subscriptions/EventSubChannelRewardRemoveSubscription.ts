import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';
import { EventSubChannelRewardEvent } from '../events/EventSubChannelRewardEvent';
import { type EventSubChannelRewardEventData } from '../events/EventSubChannelRewardEvent.external';
import type { EventSubBase } from '../EventSubBase';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelRewardRemoveSubscription extends EventSubSubscription<EventSubChannelRewardEvent> {
	/** @protected */ readonly _cliName = 'remove-reward';

	constructor(
		handler: (data: EventSubChannelRewardEvent) => void,
		client: EventSubBase,
		private readonly _userId: string,
		private readonly _rewardId?: string,
	) {
		super(handler, client);
	}

	get id(): string {
		if (this._rewardId == null) {
			return `channel.channel_points_custom_reward.remove.${this._userId}`;
		}
		return `channel.channel_points_custom_reward.remove.${this._userId}.${this._rewardId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubChannelRewardEventData): EventSubChannelRewardEvent {
		return new EventSubChannelRewardEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		if (this._rewardId) {
			return await this._client._apiClient.eventSub.subscribeToChannelRewardRemoveEventsForReward(
				this._userId,
				this._rewardId,
				await this._getTransportOptions(),
			);
		}
		return await this._client._apiClient.eventSub.subscribeToChannelRewardRemoveEvents(
			this._userId,
			await this._getTransportOptions(),
		);
	}
}
