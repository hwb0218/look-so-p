import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { authService } from '@src/lib/firebase/AuthService';
import { storageService } from '@src/lib/firebase/StorageService';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SignUpFormSchema, signUpFormSchema } from '@src/lib/zod/sign-up-schema';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Label } from '@components/ui/label';
import Wrapper from '@components/common/wrapper';

import { getImageData } from '@src/utils/set-image-data';

function getDefaultProfile() {
  const file = new File([], '/user_default.svg', { type: 'image/svg+xml' });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  return dataTransfer.files;
}

function SignUp() {
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const form = useForm<SignUpFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      profile: getDefaultProfile(),
      email: '',
      nickname: '',
      password: '',
      checkPassword: '',
      isSeller: false,
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    try {
      const profileURL = await storageService.uploadFiles(values.profile, 'profile');

      if (Array.isArray(profileURL)) {
        await authService.createUser({
          ...values,
          profile: profileURL,
        });
      }

      navigate(-1);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      }
    }
  };

  const onClickFileInput = () => {
    inputRef.current?.click();
  };

  const onResetFileInput = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = '';

      const files = getDefaultProfile();
      form.setValue('profile', files);

      setPreview('');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center flex-col space-y-4">
        <Label>프로필</Label>
        <Avatar className="w-24 h-24 cursor-pointer" onClick={onClickFileInput}>
          <AvatarImage src={preview} onClick={onResetFileInput} />
          <AvatarFallback className="bg-stone-300">
            <img src="/user_add.svg" className="w-3/4" />
          </AvatarFallback>
        </Avatar>
        <Wrapper>
          <FormField
            control={form.control}
            name="profile"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={form.formState.isSubmitting}
                    onChange={(e) => {
                      const { files, previewUrls } = getImageData({ selectedImages: e.target?.files as FileList });

                      const [imageUrl] = previewUrls;

                      onChange(files);
                      setPreview(imageUrl);
                    }}
                    ref={inputRef}
                  />
                </FormControl>
                <FormMessage className="text-center space-y-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-2">아이디</FormLabel>
                <FormControl>
                  <Input placeholder="아이디(이메일)" {...field} className="w-96" />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-2">닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임" {...field} className="w-96" />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-2">비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호(영문, 숫자, 특수문자 조합)"
                    type="password"
                    className="w-96"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkPassword"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-2">비밀번호 확인</FormLabel>
                <FormControl>
                  <Input placeholder="비밀번호 확인" type="password" className="w-96" {...field} />
                </FormControl>
                <FormMessage className="flex-none" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pl-2 py-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>판매자 입니다</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            회원가입
          </Button>
        </Wrapper>
      </form>
    </Form>
  );
}

export default SignUp;
