import {CAPABILITIES} from './models';

/**
 * Returns true if userCapabilities contains passed capability
 * @param capability
 * @returns {function(*): boolean}
 */
export const hasCapability = (capability) => (state) => !!state.get('userCapabilities')?.contains(capability);

export const hasAdminCapability = hasCapability(CAPABILITIES.ADMIN);
