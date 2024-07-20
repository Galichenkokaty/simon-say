// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	devServer: {
		port: 9876,
		host: '0.0.0.0',
	},
	modules: [ 'nuxt-icons', "@nuxt/image"],
	css: ['~/assets/css/style.css','~/assets/css/fonts.css'],
	image:{
		dir:'assets/img'
	}

})