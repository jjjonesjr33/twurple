import { CustomError } from '@twurple/common';

/**
 * Thrown whenever an invalid token is supplied.
 */
export class InvalidTokenError extends CustomError {
	/** @private */
	constructor() {
		super('Invalid token supplied');
	}
}
