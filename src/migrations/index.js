import dropDb from './1-drop-db';
import createInitialBadges from './2-create-initial-badges';
import createDavAccount from './3-create-dav-account';
import seedRandomStations from './4-seed-random-stations';

export default [
  dropDb,
  createInitialBadges,
  createDavAccount,
  seedRandomStations,
];
