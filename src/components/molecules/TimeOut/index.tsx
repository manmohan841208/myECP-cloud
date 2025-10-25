import Card  from '@/components/atoms/Card'
import React from 'react'

interface TimeOutPageProps{
    message: React.ReactNode;
    className?: string;
}

const TimeOutPage:React.FC<TimeOutPageProps> = ({
    message,
    className,
}) => {
  return (
    <Card
    header="Warning"
    className={`sm:w-[44.77%] bg-white w-[80%] ${className}`}
    >
        {message}
    </Card>
  )
}

export default TimeOutPage
