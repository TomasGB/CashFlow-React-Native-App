import React, {useState, useEffect} from 'react';
import { View, Text,} from 'react-native';
import { State } from 'react-native-gesture-handler';
import firebase from '../database/firebase'

function Balance(){
    
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [balance, setBalance] = useState();
    const [totIncome, setTotIncome] =useState();
    const [totExpense, setTotExpense] =useState();

        useEffect(() => {
          firebase.db.collection('transactions').orderBy("dateId", "desc").onSnapshot(querySnapshot =>{

              querySnapshot.docs.forEach(doc =>{
                if (doc.data().Type == 'expense' | doc.data().Type == 'Expense'){
                  expenses.push({
                    amount: doc.data().Amount,
                  })
                }else{
                  incomes.push({
                    amount: doc.data().Amount,
                  })
                }
                let acumIncome=0;
                let acumExpenses=0;

                for(let i=0; i<=incomes.length-1; i++){
                    acumIncome = acumIncome + parseFloat(incomes[i].amount);
                    }

                for(let j=0; j<=expenses.length-1; j++){
                    acumExpenses = acumExpenses + parseFloat(expenses[j].amount);
                }

                let finalBal = (acumIncome - acumExpenses);
                
                setTotExpense(acumExpenses)
                setTotIncome(acumIncome)
                setBalance(finalBal)
              });
            
            setIncomes(incomes)
            setExpenses(expenses)
              });
      },[]);
    return (
            <View style={{flex:1,justifyContent:'center', padding:15}}>
                <View style={{}}>
                    <Text style={{textAlign:'center', marginTop:25, marginBottom:5, fontSize:20}}>Your Balance</Text>
                    <Text style={{fontSize:20, textAlign:'center'}}>{balance}</Text>
                </View>
                <View style={{marginVertical:20,flexDirection:'row'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontSize:18,marginHorizontal:15}}>Income</Text>
                            <Text style={{fontSize:14, color:'green'}}>{`+ ${totIncome}`}</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontSize:18,marginHorizontal:15}}>Expenses</Text>
                            <Text style={{fontSize:14, color:'red'}}>{`- ${totExpense}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
export default Balance;