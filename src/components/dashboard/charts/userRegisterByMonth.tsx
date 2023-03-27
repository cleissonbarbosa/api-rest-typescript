import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Users } from '@prisma/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface userData {
    labels: Array<string>,
    datasets: Array<{
        label: string,
        data: Array<Number>,
        borderColor?: string,
        backgroundColor?: string,
    }>
}

export function UserRegisterByMonthChart( chatData ) {
    const { data } = chatData
    if(!data){
        return <></>
    }

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'User Register',
        },
        },
    };
  
    let labels: Array<string> = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
    const userData: Array<number> = [...labels.map((month, index) => countUserPerMonthRegistred(data, index))]
    let data1: userData = {
        labels,
        datasets: [{
            label: 'Users',
            data: userData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    }

    return <Line options={options} data={data1} />;
}

function countUserPerMonthRegistred(users, month: number): number {
    const count = users.filter( (user) => {
        const date = new Date( user.createdAt )
        console.log("Data: ", date, date.getMonth(), month)
        return date.getMonth() === month
    })
    console.log(count, users, month)

    return count.length
}
