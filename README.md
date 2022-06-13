# React-Native-AppProject-2
<B>The aim is to design an online shopping App prototype for the Android and IOS platforms(cross -platforms).</B>


<BR>
<BR>
  The implementation is precised to the subsequent design. However, it is a limited prototype implementation of the clothing App


<BR>
<BR>

  <B> Introduction To Project: Overall App Structure </B>
  <BR>
  <BR>
                         ![image](https://user-images.githubusercontent.com/103975775/173405128-17d8ff98-b6a6-44cf-8c1b-d1b3cf531b8f.png)
<BR>    
<BR>
  <p>
1.-This slide describes the overall structure of the App-
2.-In login screen, user can login with the registered username and password. And if user is not registered, he/she needs to register by clicking in the new user or sign up option in the same screen.
3.-In sign up screen, user will be able to registered themselves by inserting personal details asked. Once registered user will be able to login to the app and will be able to see the products.
4.-Profile screen-User will be able to see the profile and will be able to logout as well.
5.-Once user signed in, he /see will be able to select the categories and can order products.
6.-User will be able to add the product to the cart.
7.-Once user click the cart option, he/she will be able to see the ordered products.
8.-The categories option shows that there are 2 categories in the app-men and women wear.</p>
<BR>    
<BR>
  <B>1.- USER INTERFACE IMPLEMENTATION (navigation code)
</B>
 <BR>
   
 <BR>
The App uses react-navigation-stack’ library to implement  transition between the screens and manage navigation history.This code is implemented in the index.js file
Navigation is used to move between various screens in the ideal way. Stack Navigator is fundamentally utilized in the route starting with one screen then onto the next to and fro.All the screens are set in a stack and we can set the screens as indicated by our necessities implies which screen should start things out.
The ‘createStackNavigator’ function generates the stack object, that is then used in the ‘NavigationContainer’ component to add screens to the stackThis can be used to navigate further to other screens

<BR>
<BR>
  ![image](https://user-images.githubusercontent.com/103975775/173406911-2a946415-6299-479a-a682-8af8f16042d3.png)

<BR>
<BR>
  
  <b>2.- USER INTERFACE IMPLEMENTATION(event handling)
 </b>
<BR>    
<BR> 
-User can interact with the app mainly through touches. One of the best component is button which is the most important.
-There are various modes of interaction implemented in this app such as onPress, button and onChangeText.

  <B>Buttons on Home screen to navigate to other screens </B>
<BR>
<BR>
-The ’onPress’ prop of various componentis used to allow a ‘single tap’ interaction – e.g. to navigate from the Search to Details screen, or to capture the various Buttons being clicked
-The ‘TouchableOpacity’ component is used to give components the ‘fading’ visual behavior – e.g. when a list item is selected


<BR>    
<BR>  
![image](https://user-images.githubusercontent.com/103975775/173405891-d1b9903d-d8ae-4dee-b450-5ac95d12c80b.png)
![image](https://user-images.githubusercontent.com/103975775/173405910-189d5911-5e11-46d8-9dab-533335532253.png)


 <BR>
<BR>
  <b>3.- DATA PERSISTENCE </b>
<BR>
<BR>  
  React bindings for Redux separate presentational components from container components. 
  This approach can make your app easier to understand and allow you to more easily reuse components.
<BR>
<BR> 
  ![image](https://user-images.githubusercontent.com/103975775/173407548-ce990155-0b9a-439e-a664-5c913b27ae9e.png)
 <BR> 
   

 ![image](https://user-images.githubusercontent.com/103975775/173407557-76f265b4-25b3-409a-9e9d-cdbf586b5b1a.png)

 <BR>
   

THANKS

  
