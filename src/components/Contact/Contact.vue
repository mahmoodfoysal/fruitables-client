<script>
import emailjs from 'emailjs-com';

export default {
    name: 'Contact',
    data() {
        return {
            name: '',
            subject: '',
            email: '',
            phone: '',
            message: ''
        };
    },
    methods: {
        sendEmail(e) {
            e.preventDefault()
            const templateParams = {
                name: this.name,
                email: this.email,
                subject: this.subject,
                phone: this.phone,
                message: this.message
            };

            console.log('Template Params:', templateParams);

            emailjs.sendForm('service_8velmx9', 'template_a0wk1gc', e.target, 'Fxn081CAW6lcRjYKl')
                .then((result) => {
                    this.name = '';
                    this.subject = '';
                    this.email = '';
                    this.phone = '';
                    this.message = '';
                    alert("Sent Message Successfully");
                })
                .catch((error) => {
                    console.error('Error sending email:', error.text);
                });
        },
    }
};
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Contact</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Contact</li>
        </ol>
    </div>
    <!-- Single Page Header End -->
    <!-- Contact Start -->
    <div class="container-fluid contact py-5">
        <div class="container py-5 container-style">
            <div class="p-5 bg-light rounded">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="text-center mx-auto" style="max-width: 700px;">
                            <h1 class="text-primary">Get in touch</h1>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="h-100 rounded">
                            <iframe class="rounded w-100" style="height: 400px;"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.120228378651!2d90.39338887402643!3d23.74309168905929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8616c79536d%3A0xef5ed4a1110af709!2sJMI%20GROUP!5e0!3m2!1sen!2sbd!4v1716287534924!5m2!1sen!2sbd"
                                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <form class="form-style" @submit.prevent="sendEmail">
                            <input v-model="name" type="text" class="w-100 form-control border-0 py-3 mb-4" name="name"
                                placeholder="Your Name">
                            <input v-model="subject" type="text" class="w-100 form-control border-0 py-3 mb-4"
                                name="subject" placeholder="Please Enter Subject">
                            <input v-model="phone" type="number" class="w-100 form-control border-0 py-3 mb-4"
                                name="phone" placeholder="Enter Your Phone Number">
                            <input v-model="email" type="email" class="w-100 form-control border-0 py-3 mb-4"
                                name="email" placeholder="Enter Your Email">
                            <textarea v-model="message" class="w-100 form-control border-0 mb-4" rows="5" cols="10"
                                name="message" placeholder="Your Message"></textarea>
                            <button class="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                                type="submit">Submit</button>
                        </form>
                    </div>
                    <div class="col-lg-5">
                        <div class="d-flex p-4 rounded mb-4 bg-white address-info-style">
                            <i class="fas fa-map-marker-alt fa-2x text-primary me-2"></i>
                            <div>
                                <h4>Address</h4>
                                <p class="mb-2">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                        <div class="d-flex p-4 rounded mb-4 bg-white address-info-style">
                            <i class="fas fa-envelope fa-2x text-primary me-2"></i>
                            <div>
                                <h4>Mail Us</h4>
                                <p class="mb-2">foysalcse033@gmail.com</p>
                            </div>
                        </div>
                        <div class="d-flex p-4 rounded bg-white address-info-style">
                            <i class="fa fa-phone-alt fa-2x text-primary me-2"></i>
                            <div>
                                <h4>Telephone</h4>
                                <p class="mb-2">+8801714226177</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact End -->
</template>

<style scoped>
.form-style input {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}
.form-style textarea {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}
.form-style button {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
}

@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px;
        margin: auto;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1024px) {
    .container-style {
        max-width: 900px;
        margin: auto;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
}

@media only screen and (max-width: 375px) {
    .container-style {
        width: 100%;
        margin: auto;
    }

    .address-info-style i {
        font-size: 24px;
    }

    .address-info-style h4 {
        font-size: 14px;
    }

    .address-info-style p {
        font-size: 10px;
    }
}
</style>