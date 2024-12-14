require('dotenv').config();
const {
  messageProducer,
  getCacheByKey,
  setExCache,
  invalidateCacheByKey
} = require('./support');

console.log('')
console.log('')
console.log('')
console.log('')

let sleep = s => new Promise(resolve => setTimeout(resolve, s*1000))


function generateOTP(length = 4) {
  if (length <= 0) throw new Error('OTP length must be greater than 0');

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }
  return otp;
}
let ttp;

const handleServiceOtp = async ({ generate, verify, entered_otp, transaction_id, consignment_service_unique_id }) => {
  
  if (!transaction_id) {
    throw new BadRequestError('Transaction ID is required to generate OTP')
  }

  if (generate) {
    const txnOtp = generateOTP()
    ttp=txnOtp
    console.log('----txnOtp----', txnOtp)
    await setExCache(transaction_id, 10, { OTP: txnOtp, consignment_service_unique_id });
    await messageProducer({
      data: {
        transaction_id,
        consignment_service_unique_id,
        OTP: txnOtp
      },
      topic: 'REGISTER_SERVICE_OTP_IN_CUSTOMER',
    });

    return { generated: true }
  } 
  else if (verify && entered_otp) {
    const {status,data} = await getCacheByKey(transaction_id)
    // console.log({status,data})
    if (Number(data.OTP) == Number(entered_otp)) {
     await invalidateCacheByKey(transaction_id)
      return { otp_verified: true }
    } else {
      return { otp_verified: false }
    }
  }

  console.log('----end of code----')

}

const func = async ()=>{
  await sleep(10)
  try{

  const data1 = await handleServiceOtp({generate:true, transaction_id:'axr', consignment_service_unique_id:'MSSER-BJ92GG34' })
  console.log('-----data1----',data1)
  // await sleep(12)
  // const data2 = await handleServiceOtp({ verify:true, transaction_id:'axr', consignment_service_unique_id:'MSSER-BJ92GG34',entered_otp:ttp })
  // console.log('-----data2----',data2)

  }catch(err){
    console.log(err)
  }
} 


func()


