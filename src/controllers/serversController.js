import mongoose from 'mongoose';
import request from 'request';

import Server from '../models/Server';
import { auth } from '../config';
import botControl from '../bot';

export const getServer = (req, res, next) => {
  Server.findOne({ id: req.params.server })
    .exec((err, server) => {
      if (err) {
        return next(err);
      }

      if (!server) {
        return res.status(200).json({ uninitialized: true });
      }

      const serverData = botControl.getServer(server.id);
      
      return res.status(200).json({ name: serverData.name });
    });
}

export const joinServer = (req, res, next) => {
  const id = req.params.server;
  
  res.redirect(`${auth.authorizeUrl}?&client_id=${auth.clientId}&scope=bot&permissions=37080128&guild_id=${id}&response_type=code&redirect_uri=${auth.joinRedirectUrl}`)
}

export const finishJoinServer = (req, res, next) => {
  const url = `${auth.tokenUrl}?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${auth.joinRedirectUrl}&client_id=${auth.clientId}`;
  
  request.post(url, (err, response, body) => {
    res.redirect(`${auth.serverRedirectUrl}${req.query.guild_id}`);
  });
}