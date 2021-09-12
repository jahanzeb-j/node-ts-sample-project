import assert from 'assert';
import UserRepository from '../../database/repositories/userRepository';
import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import { IServiceOptions } from '../IServiceOptions';

/**
 * Handles the update of the user profile.
 */
export default class AuthProfileEditor {
  options: IServiceOptions;
  transaction;
  data;

  constructor(options) {
    this.options = options;
    this.transaction = null;
  }

  /**
   * Executes the user update.
   *
   * @param {*} data
   */
  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.transaction = await SequelizeRepository.createTransaction(
        this.options.database,
      );

      await UserRepository.updateProfile(
        this.options.currentUser.id,
        this.data,
        this.options,
      );

      await SequelizeRepository.commitTransaction(
        this.transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        this.transaction,
      );
      throw error;
    }
  }

  /**
   * Validates the user info.
   */
  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );
    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data, 'profile is required');
  }
}
