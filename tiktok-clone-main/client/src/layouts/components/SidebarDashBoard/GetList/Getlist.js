import axios from 'axios';

export const getListUser = async () => {
    try {
        //call api get list user
        const configHeader = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        };
        const response = await axios.get('http://localhost:5000/users', configHeader);
        setTimeout(() =>{
            showUser(response);
        },1000)
    } catch (error) {
        //error
        //call refresh token để ghi đè lại
        //token hết hạn -> rediect đến admin
        console.log();
    }
};

const showUser = (res) => {
    return res.data.map((item, index) => {
        return <div key={index}>{item.name}</div>
    })

};

// export const Show = () => {
//     return(<>{showUser()}</>)
// }
