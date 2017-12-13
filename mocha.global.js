import app from './server';
import mongoose from 'mongoose';

after(function(done) {
  app.store.on('close', () => done());
  mongoose.connection.close();
  app.store.close();
});
