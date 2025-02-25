'use client';

import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { FormValuePreselection } from '@/types/form';
import { toastErrAxios } from '@/helpers/toast';
import { preselectionInitialValue, preselectionSchema } from '@/libs/preselectionSchema';
import CreateQuestion from './createQuestion';
import axios from '@/helpers/axios';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { sweetAlertWarning } from '@/helpers/sweetAlert';

export default function CreateSelectionTest() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { jobId } = useParams();
  const router = useRouter();

  const handleAdd = async (preselection: FormValuePreselection) => {
    const { isConfirmed } = await sweetAlertWarning(`As a continuing development you cannot edit this test`, "Confirm!")
    if (!isConfirmed) return
    try {
      setIsLoading(true);
      const { data } = await axios.post('/preselection', { ...preselection, jobId });
      const statusPreselection = await axios.patch(`/preselection/active/${jobId}`, { isTestActive: true })
      toast.success(data.message);
      toast.success(statusPreselection.data.message);
      router.push('/admin/job');
    } catch (err: unknown) {
      toastErrAxios(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10'>
      <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Create Preselection Test</h1>
      <Formik
        initialValues={preselectionInitialValue}
        validationSchema={preselectionSchema}
        onSubmit={(values) => handleAdd(values)}
      >
        {(props: FormikProps<FormValuePreselection>) => (
          <Form className='space-y-6'>
            <div>
              <label htmlFor='title' className='block font-medium text-gray-700'>Title</label>
              <Field
                type='text'
                name='title'
                id='title'
                placeholder='Enter your title preselection test'
                className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blueNavy focus:outline-none'
              />
              <ErrorMessage name='title' component='div' className='text-red-500 text-sm mt-1' />
            </div>

            <div>
              <label htmlFor='description' className='block font-medium text-gray-700'>Description</label>
              <Field
                as='textarea'
                name='description'
                id='description'
                placeholder='Enter preselection test description'
                className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blueNavy focus:outline-none h-28'
              />
              <ErrorMessage name='description' component='div' className='text-red-500 text-sm mt-1' />
            </div>

            <div>
              <CreateQuestion {...props} />
              {props.errors.preselectionQuestions && typeof props.errors.preselectionQuestions === 'string' && (
                <div className='text-red-500 text-sm mt-1'>{props.errors.preselectionQuestions}</div>
              )}
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold rounded-lg transition duration-200 ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blueNavy/80 hover:bg-blueNavy'}`}
            >
              {isLoading ? 'Processing...' : 'Create Preselection Test'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
