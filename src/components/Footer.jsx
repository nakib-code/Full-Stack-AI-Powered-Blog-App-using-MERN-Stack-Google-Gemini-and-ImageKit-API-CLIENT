import React from 'react'
import { useAppContext } from '../context/AppContest'
import { FaGithub, FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa'

const Footer = () => {
    const { navigate } = useAppContext()

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/nakib-code',
            icon: <FaGithub />
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/nakibul/',
            icon: <FaLinkedin />
        },
        {
            name: 'Portfolio',
            url: 'https://ahmed-nakib-portfolio.vercel.app/',
            icon: <FaGlobe />
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/mohiuddin.nakib.9/',
            icon: <FaFacebook />
        }
    ]

    return (
        <footer className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5'>

            <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-8 py-10 border-b border-gray-400/30'>

                {/* Brand */}
                <div className='text-center md:text-left'>
                    <button
                        onClick={() => navigate('/')}
                        className='text-primary font-bold text-2xl border-b-4 border-primary cursor-pointer'
                    >
                        SIMPLEBLOG .
                    </button>

                    <p className='max-w-[450px] mt-5 text-sm leading-relaxed text-gray-500'>
                        A modern blogging platform for developers to share
                        tutorials, insights, and knowledge about web development
                        and programming.
                    </p>
                </div>

                {/* Social Links */}
                <div className='text-center md:text-left'>
                    <h3 className='font-semibold text-base text-gray-700 mb-4'>
                        Follow Me
                    </h3>

                    <div className='flex items-center justify-center md:justify-start gap-4'>
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                title={social.name}
                                className='w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-all duration-200'
                            >
                                <span className='text-lg'>
                                    {social.icon}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <p className='py-5 text-center text-sm text-gray-500'>
                © 2026 SIMPLEBLOG by Nakib — All Rights Reserved
            </p>

        </footer>
    )
}

export default Footer