  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
  import {getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyAA_ftFVcc4mqGd04NL4p9gYRc_GajgxOA",
    authDomain: "carritocompra-b670f.firebaseapp.com",
    projectId: "carritocompra-b670f",
    storageBucket: "carritocompra-b670f.appspot.com",
    messagingSenderId: "484469835703",
    appId: "1:484469835703:web:d0d6f1729ed62f518d8a32",
    measurementId: "G-NCKWKSDTT2"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore(app);

 export const getProductos = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));

    const productos =[]

    querySnapshot.forEach((doc) => {
      productos.push(doc);
  });

  return productos;


  }

  // me trae de la bd uno de los productos
  export const obtenerProducto = async (id) => {

  // funcion para traer un solo elemento por id de la bd
  // para utilizar el parametro id, necesito crear una funcion asincronica
  const docRef = doc(db, "productos", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
    } else {

    console.log("No such document!");
  }


}



