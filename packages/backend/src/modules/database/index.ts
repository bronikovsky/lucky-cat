// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexfile = require('./knexfile.cjs');

export const config = process.env.NODE_ENV === 'production' ? knexfile.production : knexfile.development;
