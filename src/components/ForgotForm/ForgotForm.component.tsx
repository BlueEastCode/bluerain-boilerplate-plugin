import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
import { Link } from 'react-router-dom';


const ForgotForm = (props: any) => {
	const BR = props.bluerain;
	const Text = BR.Components.get('Text');
	const View = BR.Components.get('View');
	const Button = BR.Components.get('Button');
	const Image = BR.Components.get('Image');
	const TextInput = BR.Components.get('TextInput');
	return (
<View style={{ flex:1 }}>
    <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:15, marginBottom:15}}>Reset Password</Text>
        <TextInput
            label="Email"
            placeholder="Enter email"
            fullWidth={true}
            margin="normal"
            style={{marginTop:0}}
            required={true}
        />
    <Button fullWidth={true} color="primary" style={{marginTop:15}}><Text>Next</Text></Button>
    <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:15,}}>
    Don't have account?
    <Link to="/signup" style={{fontWeight:'bold', textDecoration:'none', color:'grey'}}> Sign up</Link></Text>
</View>);
};

export default withBlueRain(ForgotForm);
