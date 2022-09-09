import tokenService from './tokens';
import { ENDPOINT } from '../configs';
import storage from "./storage";
import { STORAGE_KEY } from "../constants";
import uuid from "react-native-uuid"
import moment from "moment";

class Offline {
  constructor(tokens) {
    
  }

  /**
   * Insert data to offline storage
   */
  async addData(newData) {
    let transaksi = await storage.get(STORAGE_KEY.TRANSAKSI);
    let dataTransaksi = []
    let result = {code:99}
    newData["offlineId"] = uuid.v1();

    if(Object.keys(transaksi).length === 0){
      dataTransaksi.push(newData)
      await storage.set(STORAGE_KEY.TRANSAKSI,dataTransaksi)
    }else{
      dataTransaksi = transaksi
      dataTransaksi.push(newData)
      await storage.set(STORAGE_KEY.TRANSAKSI,dataTransaksi)
    }
    console.log("newData",newData)
    return result
  }

  /**
   * Sync data to server
   */

  async syncData(newData) {
    let transaksi = await storage.get(STORAGE_KEY.TRANSAKSI);
    let params = {'transactions':JSON.stringify(transaksi)}
    try{
      if(transaksi.length > 0){
        let result = await ENDPOINT.saveOfflineTransaction(params);
        console.log('result',result)
        if(result.code === 201 && result.success){
          await storage.set(STORAGE_KEY.LAST_SYNC,moment().format("dddd, DD MMMM YYYY (HH:mm)"))
          await storage.remove(STORAGE_KEY.TRANSAKSI)
        }
      }
    }catch(e){
      console.log('params',params)
      console.log('error',e)
    }
  }

  /**
   * Parse receipt data for offline receipt
   */

  parseReceiptData = async (data) => {
    let transactionData = {...data}
    let products = []
    let ts = data.totalSection
    
    //convert all value on total section to integer
    for (const [key, value] of Object.entries(ts)) {
      ts[key] = parseInt(`${value}`.replace(/\./g,''))
    }
    
    data.products.forEach((p)=>{
      let productItem = p
      productItem = {...productItem,...p.rawValue}
      productItem['nameProduct'] = p.productName
      productItem['discountNominal'] = productItem.nominalDiscount / productItem.quantity
      productItem['totalPrice'] = p.rawValue.priceBeforeDiscount
      if(p.isBbm){
        productItem['qtyVariantValue'] = p.rawValue.quantity  
      }
      products.push(productItem)
    })

    transactionData['product'] = products
    transactionData = {...transactionData,...ts}

    if(transactionData['totalSection']['totalPriceBeforeDiscount'] != undefined) {
      transactionData['totalPrice'] = ts['totalPriceBeforeDiscount']
      transactionData['discount'] = ts['totalNominalDiscount']
    }
    console.log('transactionData',transactionData)
    return transactionData;
  }

}

export { Offline };
export default new Offline();
