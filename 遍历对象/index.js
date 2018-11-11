// 过滤arr中所有的falsy值
const filterFalsy = arr => arr.filter(item => item);
const arr = [ 1, false, true, undefined, null, NaN, '', {}];
console.log(filterFalsy(arr));

// 为每个VIP用户的余额加100
const users = [{
        username: "Kelly",
        isVIP: true,
        balance: 20
    },
    {
        username: "Tom",
        isVIP: false,
        balance: 19
    },
    {
        username: "Stephanie",
        isVIP: true,
        balance: 30
    }
];
const newUsers = users.map(
    user => user.isVIP ? { ...user,  balance: user.balance + 10 } : user
)
console.log(users)
console.log(newUsers == users)
console.log(newUsers === users)