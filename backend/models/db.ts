import Datastore from 'nedb';
export const user = new Datastore({ filename: './databases/user.db', autoload: true });
