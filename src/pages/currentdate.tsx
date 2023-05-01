import React from 'react';


const CurrentDate = () => {

    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const mesesDoAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const data = new Date();
    const dia = dias[data.getDay()];
    const diaNum = data.getDate().toString();
    const mes = mesesDoAno[data.getMonth()];

//     const styles = StyleSheet.create({
//         dia: {
//             color: 'grey',
//             fontSize: 12,
//             fontFamily: 'ReadexPro-Regular',
//         },
//         diaNumMes: {
//             color: '#1D2A30',
//             fontFamily: 'ReadexPro-Medium',
//             fontSize: 16,
//         },
// });

    return (
        <>
        <div>
            <a className='text-sm ml-px'>{dia}, {'\n'}{diaNum} de {mes}</a>
        </div>
        </>
    );
};

export default CurrentDate;
