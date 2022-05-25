import React from 'react';

const Portfolio = () => {
    return (
        <div className='mb-32 '>
            <h1 className='text-5xl font-bold mb-10'>Portfolio</h1>
            <p className='text-lg mb-3'>Name: Labib Amir Salimi</p>
            <p className='text-lg mb-10'>Email: labib.salimi30@gmail.com</p>
            <h3 className='text-3xl font-semibold mb-5'>Educational Background</h3>
            <div class="overflow-x-auto mb-10">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Certificate</th>
                            <th>Group/Subject</th>
                            <th>Institution</th>
                            <th>GPA/CGPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Secondary School Certificate</td>
                            <td>Science</td>
                            <td>Sylhet Government Pilot High School</td>
                            <td>4.78</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Higher Secondary School Certificate</td>
                            <td>Science</td>
                            <td>Sylhet Government Model School and College</td>
                            <td>5.00</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>B.Sc Honours</td>
                            <td>Computer Science and Engineering</td>
                            <td>National University</td>
                            <td>Ongoing</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className='text-3xl font-semibold my-5'>List of technologies that I use as a web developer</p>
            <ul className='list-disc list-inside mb-10'>
                <li className='text-lg mb-3'>HTML5</li>
                <li className='text-lg mb-3'>CSS3</li>
                <li className='text-lg mb-3'>Bootstrap</li>
                <li className='text-lg mb-3'>TailwindCSS</li>
                <li className='text-lg mb-3'>React</li>
                <li className='text-lg mb-3'>Node/Express</li>
                <li className='text-lg mb-3'>Mongodb</li>
            </ul>
            <div class="overflow-x-auto">
                <h3 className='text-3xl font-semibold my-5'>These are some of my best projects so far</h3>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Inventory Management Site</td>
                            <td><a target='_blank' className='link' href="https://crick-freak-assignment.web.app/">Live Site</a></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Personal Service Provider Site</td>
                            <td><a target='_blank' className='link' href="https://guitar-tutor-assignment.web.app/">Live Site</a></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Mouse Review</td>
                            <td><a target='_blank' className='link' href="https://razer-boomslang-review.netlify.app/home ">Live Site</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;