<template>
    <div class="p-2 md:p-8 cont">
        <div
        class="
            grid grid-cols-1
            md:grid-cols-1
            lg:grid-cols-1
            justify-items-center
        "
        >
        <div
            class="w-full md:w-1/3 lg:w-1/4 bg-white p-5 md:p-10 rounded-2xl z-20"
        >
            <h1 class="text-center font-extrabold">Login</h1>
            <form action="" class="text-black-500 pt-4" @submit.prevent="login">
                <span class="text-red-500 text-xs" v-if="errors"> 
                    {{errors.password.msg || errors.username.msg || errors}}
                </span>
                <label for="username" class="block">
                    <span class="text-black-100">Username</span>
                    <input
                        type="email"
                        v-model="username"
                        class="
                            mt-3
                            mb-3
                            block
                            w-full
                            px-0.5
                            py-1
                            text-gray-500
                            rounded-r
                            border-0 border-b-2 border-gray-300
                            focus:border-gray-600 focus:outline-none
                        "
                        placeholder="coolemail@xyz.com"
                        required
                    />
                </label>
                <label for="password" class="block">
                    <span class="text-black-100">Password</span>
                    <input
                        type="password"
                        v-model="password"
                        class="
                            mt-3
                            mb-3
                            block
                            w-full
                            px-0.5
                            py-1
                            text-gray-500
                            rounded-r
                            border-0 border-b-2 border-gray-300
                            focus:border-gray-600 focus:outline-none
                        "
                        required
                    />
                </label>
                <button
                    type="submit"
                    class="
                    mt-3
                    w-full
                    px-3
                    py-2
                    text-white text-xl
                    rounded-full
                    bg-blue-500
                    hover:bg-blue-650
                    focus:bg-blue-650
                    "
                    :class="{ 'animate-pulse': loading, 'opacity-75': loading }"
                >
                    Login <i class="cursor"></i>
                </button>
                <p class="mt-3 text-center">
                    <small>
                        Don't have an account?
                        <nuxt-link to="/auth/register" class="text-blue-650">
                            Sign up
                        </nuxt-link>
                    </small>
                </p>
            </form>
        </div>
        <Nuxt />
        </div>
    </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      username: '',
      password: '',
      errors: null,
      success: false,
      loading: false,
    }
  },
  methods: {
    async login() 
    {
        this.loading = true;
        await this.$auth.loginWith("local", {
            data: {
                username: this.username,
                password: this.password,
            }
        })
        .then((response) => {
            console.log(response);
            this.$toast.success(`${response.message}`, {
            action: {
                text: "X",
                onClick: (e, toastObj) => {
                toastObj.goAway(0);
                },
            },
            position: "top-center",
            duration: 7000,
            });
            this.$router.replace("/dashboard");
        })
        .catch ((error) => {
            console.log(error);
            if(error.response.data) {
                this.errors = error.response.data.errors;
                console.log(this.errors);
            }
        })
        .finally(() => {
            this.loading = false;
        });
    },//login ends here

  },
};
</script>

