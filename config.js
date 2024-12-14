const {
  NODE_ENV,
  ENCRYPTION_SECRET_KEY,
  JWT_SECRET_KEY,
  JWT_REFERESH_SESSION_TIMEOUT,
  JWT_SESSION_TIMEOUT,
  KAFKA_BROKER_STAGE,
  KAFKA_CLIENT_ID_STAGE,
  REDIS_URL_STAGE,
  REDIS_PORT_STAGE,
  REDIS_PASSWORD_STAGE,
  GOOGLE_MAP_KEY,
  HELPER_URL_STAGE,
} = process.env;

module.exports = {
  Environment: {
    environmentKey: NODE_ENV,
  },
  Encryption: {
    encryptionSecretKey: ENCRYPTION_SECRET_KEY,
  },
  jwt: {
    jwtSecretKey: JWT_SECRET_KEY,
    refreshSessionTimeout: JWT_REFERESH_SESSION_TIMEOUT,
    sessionTimeout: JWT_SESSION_TIMEOUT,
  },
  kafkaConfig: {
    broker: KAFKA_BROKER_STAGE,
    clientId: KAFKA_CLIENT_ID_STAGE,
  },
  redisConfig: {
    uri: REDIS_URL_STAGE,
    port: REDIS_PORT_STAGE,
    password: REDIS_PASSWORD_STAGE,
  },
  googleApisConfig: {
    googleMapKey: GOOGLE_MAP_KEY,
  },
  helperUrl: {
    url: HELPER_URL_STAGE,
  },
};
