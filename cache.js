const redisClient = require('./redis')

const addCache= async function (key, data, cacheTime) {
  try {
    return await redisClient.setex(key, cacheTime, JSON.stringify(data))
  } catch (err) {
    console.log(err);
    return false;
  }
}

const getCacheByKey = async function (key) {
  const cacheData = {
    status: false,
    data: {}
  }
  try {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {
        if (!err) {
          if (result) {
            cacheData.status = true
            cacheData.data = JSON.parse(result)
            console.log(cacheData)
            resolve(cacheData)
          } else {
            resolve(cacheData)
          }
        } else {
          reject(cacheData)
        }
      })
    })
  } catch (err) {
    return cacheData
  }
}

const invalidateCacheByKey=async function (key){
  try{
    return await redisClient.del(key)
  }catch(err){
    return false;
  }
}

const setExCache = async function (key, cacheTime, data) {
  await redisClient.setex(key, cacheTime, JSON.stringify(data))
}

const batchDeletionKeysByPattern=async function (key){
  return await redisClient.delWildcard(key);
}

module.exports={addCache,getCacheByKey,invalidateCacheByKey,batchDeletionKeysByPattern,setExCache}