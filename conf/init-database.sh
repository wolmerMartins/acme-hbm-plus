#! /bin/bash

mongosh <<EOF
use hbm_plus;
hbm_plus = db.getSiblingDB('hbm_plus');
hbm_plus.createUser({
  user: 'hbmdev',
  pwd: '123456',
  roles: [
    {
      role: 'dbAdmin',
      db: 'hbm_plus'
    }
  ]
})
EOF
