import { type RouteConfig, index,route } from "@react-router/dev/routes";

//this helps in routing 

export default 
[index("routes/home.tsx"),
    // helps us to go to routes/auth page
route('/auth','routes/auth.tsx'),
] satisfies RouteConfig;
