const { createClient }  =  require('redis');

const client = createClient({
    password: 'RXzfPiadh5bFkN5LyYwmCLjYQhksllFS',
    socket: {
        host: 'redis-10685.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10685
    }
});

client.on('connect',()=>{
    console.log("Redis Connected");
})

module.exports = client