const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const PermissionType = new GraphQLObjectType({
    name: 'Permission',
    fields: {
        name: { type: GraphQLString },
        path: { type: GraphQLString },
        method: { type: GraphQLString },
        permission: { type: GraphQLString }
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        id: { type: GraphQLString },
        profile: { type: GraphQLString },
        permissions: {
            type: new GraphQLList(PermissionType),
            resolve(parentValue, args) {
                const options = {
                    method: 'GET',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${parentValue.jwt}` },
                    url: `http://localhost:8000/auth/pap/group/${parentValue.profile}/permissions`,
                };
                return axios(options).then(res => {
                    return res.data.permissions
                })
            }
        }
    })
});

const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        jwt: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                const options = {
                    method: 'GET',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${parentValue.jwt}` },
                    url: `http://localhost:8000/auth/user/${parentValue.username}`,
                };
                return axios(options).then(res =>  res.data.user)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: LoginType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {

            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: LoginType,
            args: { username: { type: GraphQLString }, passwd: { type: GraphQLString } },
            resolve(parentValue, { username, passwd }) {
                return axios.post(`http://localhost:8000/auth`, { username, passwd })
                    .then(resp => ({...resp.data, username}));
            }
        }
    }
});

module.exports = new GraphQLSchema({
    mutation,
    query: RootQuery
});
