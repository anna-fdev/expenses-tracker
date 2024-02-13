import * as bcrypt from 'bcrypt';

export const getSalt = () => bcrypt.genSalt(8);
