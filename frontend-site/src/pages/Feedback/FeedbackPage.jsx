import React from 'react'
import FeedbackFrom from '../../components/FeedbackForm'
import MainLayout from '../../layout/MainLayout'

function FeedbackPage() {
  return (
    <MainLayout>
        <div className="  flex justify-center items-center ">
        <FeedbackFrom />
        </div>
    </MainLayout>
  )
}

export default FeedbackPage