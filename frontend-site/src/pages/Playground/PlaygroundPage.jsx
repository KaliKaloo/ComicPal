import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'

function PlaygroundPage() {
  return (
    <MainLayout>
        <div>PlaygroundPage</div>
        <ul>
            <li><Link to="/CreateStory">Create a story</Link></li>
            <li><Link to="/CreateComicPage">Create a comic page</Link></li>
            <li><Link to="/CreateCharacter">Create a character</Link></li>
        </ul>
    </MainLayout>
  )
}

export default PlaygroundPage
