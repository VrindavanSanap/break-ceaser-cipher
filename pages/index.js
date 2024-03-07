"use client"
import { useState, useEffect } from 'react'; import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ceaser_cipher, sentence_score } from "../crypto.js"

const inter = Inter({ subsets: ['latin'] })
const ibm_plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400",
    "500", "600", "700"]
})

export default function Home() {
  const [message, set_message] = useState("")
  const [lowest_score, set_lowest_score] = useState(10000)
  const [most_likely_message, set_most_likely_message] = useState("")
  const [keep_spaces, set_keep_spaces] = useState(true)
  const [keep_non_alpha, set_keep_non_alpha] = useState(true)
  console.log(keep_spaces, keep_non_alpha);
  useEffect(() => {
    handle_message_change({ target: { value: "iylhrjlhzlyjpwoly" } })
  }, [])


  function handle_message_change(event) {
    set_lowest_score(100000)
    set_message(event.target.value)
  }
  function encrypted_messages(message) {
    let enc_messages = [];
    let score = 10000
    for (let i = 0; i < 26; i++) {
      const encrypted = ceaser_cipher(message, i, keep_spaces, keep_non_alpha);
      score = sentence_score(encrypted); // Limit to 2 decimal places
      // console.log(score, lowest_score)
      if (score < lowest_score) {
        set_lowest_score(score);
        set_most_likely_message(encrypted);
      }


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

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        {label}
        <input type="checkbox" checked={value} onChange={onChange} />
      </label>
    );
  };
  function handle_keep_spaces_changed() {
    set_keep_spaces(!keep_spaces);
    set_lowest_score(100000)
  }
  function handle_keep_non_alpha_changed() {
    set_keep_non_alpha(!keep_non_alpha);
    set_lowest_score(100000)
  }

  return (

    <div className={`${ibm_plex.className}`}>
      <h1>Break Ceaser Cipher</h1>

      <label>
        Message:
        <input style={{ fontSize: 18 }}
          value={message}
          onChange={handle_message_change} />
      </label>
      <br />
      <br />
      <Checkbox
        label=" Keep spaces: "
        value={keep_spaces}
        onChange={handle_keep_spaces_changed}

      />
      <Checkbox
        label=" Keep non alpha: "
        value={keep_non_alpha}
        onChange={handle_keep_non_alpha_changed}
      />
      <div>{keep_non_alpha}</div>
      <p>Striped message: {ceaser_cipher(message, 0, keep_spaces, keep_non_alpha)}</p>
      <p><i> The lower the score the better </i></p>
      <h2>Encrypted Messages, Scores:</h2>
      <p>Your message is most likely <b>{most_likely_message} </b></p>
      <ul>
        {encrypted_messages(message)}
      </ul>

    </div>
  )
}
