import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';


const LoginForm = (props: any) => {
	const BR = props.bluerain;
	const Text = BR.Components.get('Text');
	const View = BR.Components.get('View');
	const Button = BR.Components.get('Button');
	const Image = BR.Components.get('Image');
	const TextInput = BR.Components.get('TextInput');
	return (
        <View style={{ flex:1 }}>
            <View style={{ marginTop:10, marginBottom:10, flex:1}}>
                <TextInput
                    label="Name"
                    placeholder="Enter name"
                    fullWidth={true}
                    margin="normal"
                />
                <TextInput
                    label="Email"
                    placeholder="Enter email"
                    fullWidth={true}
                    margin="normal"
                    type="email"
                />
                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth={true}
                    margin="normal"
                />
                <TextInput
                    label="Confirm Password"
                    placeholder="Enter password again"
                    type="password"
                    fullWidth={true}
                    margin="normal"
                />
                <TextInput
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    type="tel"
                    fullWidth={true}
                    margin="normal"
                />
            </View>
            <Button fullWidth={true} color="primary" style={{marginTop:15}}><Text>Sign up</Text></Button>
            <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:25}}>OR</Text>
            <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:15,}}>
            Don't have account?
            <a href="/signup" style={{fontWeight:'bold', textDecoration:'none', color:'grey'}}> Sign up</a></Text>
        </View>);
};

export default withBlueRain(LoginForm);
