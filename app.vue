<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Suspense>
        <template #default>
          <NuxtPage />
        </template>
      </Suspense>
    </NuxtLayout>
  </div>
</template>
