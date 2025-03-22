import { getPublicKey } from '@/api/login.ts'
import JSEncrypt from 'jsencrypt'

export async function rsaEncrypt(plainText: string): Promise<string> {
  const res = await getPublicKey()
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(res.data)
  return Promise.resolve(encryptor.encrypt(plainText) || '')
}
