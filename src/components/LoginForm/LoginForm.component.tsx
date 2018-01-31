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
                    label="Email"
                    placeholder="Enter email"
                    fullWidth={true}
                    margin="normal"
                />
                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth={true}
                    margin="normal"
                />
            </View>
            <a href="/forgot" style={{textDecoration:'none', color:'grey'}}><Text>Forgot Password?</Text></a>
            <Button fullWidth={true} color="primary" style={{marginTop:15}}><Text>Login</Text></Button>
            <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:15, marginBottom:15}}>OR</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Button color="link" style={{border:'1px solid blue', marginRight:5}} bordered={true} fullWidth={true}>
                    <Image source="https://cdn.worldvectorlogo.com/logos/facebook-2.svg" style={{width:15, height:20}}/>
                </Button>
                <Button color="link" style={{border:'1px solid red'}} bordered={true} fullWidth={true}>
                    <Image
                        source="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
                        style={{width:15, height:20}}
                    />
                </Button>
            </View>
            <Text style={{color:'grey', fontSize:20, textAlign:'center', marginTop:15,}}>Don't have account? <a href="/signup" style={{fontWeight:'bold', textDecoration:'none', color:'grey'}}>Sign up</a></Text>
        </View>);
};

export default withBlueRain(LoginForm);
