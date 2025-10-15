type settingsType = {
  site_name?: string;
  site_email?: string;
  site_phone?: string;
  site_logo?: string;
  site_address?: string;
  site_description?: string;
  site_footer?: string;
  currency_code?: string;
  currency_symbol?: string;
  client_side_url?: string;
  server_side_url?: string;
  otp_verification_type?: "email" | "phone";
  email_config?: {
    resend: {
      api_key: string;
      email: string;
    };
  };
  cloud_config: {
    cloudinary: {
      cloud_name: string;
      api_key: string;
      api_secret: string;
    };
  };

  stripe?: {
    credentials: {
      stripe_publishable_key: string;
      stripe_secret_key: string;
      stripe_webhook_secret: string;
    };
    is_active: string;
    logo: string;
    name: string;
  };
  paypal?: {
    credentials: {
      paypal_base_url: string;
      paypal_client_id: string;
      paypal_secret_key: string;
    };
    is_active: boolean;
    logo: string;
    name: string;
  };
  razorpay: {
    credentials: {
      razorpay_key_id: string;
      razorpay_key_secret: string;
    };
    is_active: boolean;
    logo: string;
    name: string;
  };
  mollie: {
    credentials: {
      mollie_api_key: string;
    };
    is_active: boolean;
    logo: string;
    name: string;
  };
  social_media_link?: [
    {
      name: string;
      link: string;
    }
  ];
};

export {settingsType}