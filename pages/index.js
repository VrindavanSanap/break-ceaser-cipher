"use client"
import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import {IBM_Plex_Mono, Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {ceaser_cipher, sentence_score} from "../crypto.js"

const inter = Inter({ subsets: ['latin'] })
const ibm_plex = IBM_Plex_Mono({ subsets: ['latin'], weight:["100", "200", "300", "400", "500", "600", "700"] })
export default function Home() {
  const [message, set_message] = useState("")
  function handle_message_change(event){
    set_message(event.target.value)
  } 
  function encrypted_messages(message) {
    let enc_messages = [];
    for (let i = 0; i < 26; i++) {
      const encrypted = ceaser_cipher(message, i);
      const score = sentence_score(encrypted).toFixed(2); // Limit to 2 decimal places

      enc_messages.push(
        <p key={i}>
          +{i + " "}
          {encrypted + " "}
          {score}
        </p>
      );
  
      
    }
    return enc_messages
  }
  return (

    <div className = {`${ibm_plex.className}`}>
      <h1>Break Ceaser Cipher</h1>
      <label>
      Message:
      <input style = {{fontSize: 18 }}
             value = {message} 
             onChange = {handle_message_change}/>
      </label>
      <p>Striped message: {ceaser_cipher(message)}</p>
      <h2>Encrypted Messages:</h2>
      <ul>
        {encrypted_messages(message)}
      </ul>
    </div>
  )
}
